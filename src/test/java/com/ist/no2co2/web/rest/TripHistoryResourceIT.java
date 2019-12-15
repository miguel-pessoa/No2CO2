package com.ist.no2co2.web.rest;

import com.ist.no2co2.No2Co2App;
import com.ist.no2co2.domain.TripHistory;
import com.ist.no2co2.repository.TripHistoryRepository;
import com.ist.no2co2.service.TripHistoryService;
import com.ist.no2co2.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.ist.no2co2.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ist.no2co2.domain.enumeration.Language;
/**
 * Integration tests for the {@link TripHistoryResource} REST controller.
 */
@SpringBootTest(classes = No2Co2App.class)
public class TripHistoryResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Language DEFAULT_LANGUAGE = Language.ENGLISH;
    private static final Language UPDATED_LANGUAGE = Language.PORTUGUESE;

    @Autowired
    private TripHistoryRepository tripHistoryRepository;

    @Autowired
    private TripHistoryService tripHistoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTripHistoryMockMvc;

    private TripHistory tripHistory;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TripHistoryResource tripHistoryResource = new TripHistoryResource(tripHistoryService);
        this.restTripHistoryMockMvc = MockMvcBuilders.standaloneSetup(tripHistoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TripHistory createEntity(EntityManager em) {
        TripHistory tripHistory = new TripHistory()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .language(DEFAULT_LANGUAGE);
        return tripHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TripHistory createUpdatedEntity(EntityManager em) {
        TripHistory tripHistory = new TripHistory()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .language(UPDATED_LANGUAGE);
        return tripHistory;
    }

    @BeforeEach
    public void initTest() {
        tripHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createTripHistory() throws Exception {
        int databaseSizeBeforeCreate = tripHistoryRepository.findAll().size();

        // Create the TripHistory
        restTripHistoryMockMvc.perform(post("/api/trip-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tripHistory)))
            .andExpect(status().isCreated());

        // Validate the TripHistory in the database
        List<TripHistory> tripHistoryList = tripHistoryRepository.findAll();
        assertThat(tripHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        TripHistory testTripHistory = tripHistoryList.get(tripHistoryList.size() - 1);
        assertThat(testTripHistory.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testTripHistory.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testTripHistory.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createTripHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tripHistoryRepository.findAll().size();

        // Create the TripHistory with an existing ID
        tripHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTripHistoryMockMvc.perform(post("/api/trip-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tripHistory)))
            .andExpect(status().isBadRequest());

        // Validate the TripHistory in the database
        List<TripHistory> tripHistoryList = tripHistoryRepository.findAll();
        assertThat(tripHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTripHistories() throws Exception {
        // Initialize the database
        tripHistoryRepository.saveAndFlush(tripHistory);

        // Get all the tripHistoryList
        restTripHistoryMockMvc.perform(get("/api/trip-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tripHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getTripHistory() throws Exception {
        // Initialize the database
        tripHistoryRepository.saveAndFlush(tripHistory);

        // Get the tripHistory
        restTripHistoryMockMvc.perform(get("/api/trip-histories/{id}", tripHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tripHistory.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTripHistory() throws Exception {
        // Get the tripHistory
        restTripHistoryMockMvc.perform(get("/api/trip-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTripHistory() throws Exception {
        // Initialize the database
        tripHistoryService.save(tripHistory);

        int databaseSizeBeforeUpdate = tripHistoryRepository.findAll().size();

        // Update the tripHistory
        TripHistory updatedTripHistory = tripHistoryRepository.findById(tripHistory.getId()).get();
        // Disconnect from session so that the updates on updatedTripHistory are not directly saved in db
        em.detach(updatedTripHistory);
        updatedTripHistory
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .language(UPDATED_LANGUAGE);

        restTripHistoryMockMvc.perform(put("/api/trip-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTripHistory)))
            .andExpect(status().isOk());

        // Validate the TripHistory in the database
        List<TripHistory> tripHistoryList = tripHistoryRepository.findAll();
        assertThat(tripHistoryList).hasSize(databaseSizeBeforeUpdate);
        TripHistory testTripHistory = tripHistoryList.get(tripHistoryList.size() - 1);
        assertThat(testTripHistory.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testTripHistory.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testTripHistory.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingTripHistory() throws Exception {
        int databaseSizeBeforeUpdate = tripHistoryRepository.findAll().size();

        // Create the TripHistory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTripHistoryMockMvc.perform(put("/api/trip-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tripHistory)))
            .andExpect(status().isBadRequest());

        // Validate the TripHistory in the database
        List<TripHistory> tripHistoryList = tripHistoryRepository.findAll();
        assertThat(tripHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTripHistory() throws Exception {
        // Initialize the database
        tripHistoryService.save(tripHistory);

        int databaseSizeBeforeDelete = tripHistoryRepository.findAll().size();

        // Delete the tripHistory
        restTripHistoryMockMvc.perform(delete("/api/trip-histories/{id}", tripHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TripHistory> tripHistoryList = tripHistoryRepository.findAll();
        assertThat(tripHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TripHistory.class);
        TripHistory tripHistory1 = new TripHistory();
        tripHistory1.setId(1L);
        TripHistory tripHistory2 = new TripHistory();
        tripHistory2.setId(tripHistory1.getId());
        assertThat(tripHistory1).isEqualTo(tripHistory2);
        tripHistory2.setId(2L);
        assertThat(tripHistory1).isNotEqualTo(tripHistory2);
        tripHistory1.setId(null);
        assertThat(tripHistory1).isNotEqualTo(tripHistory2);
    }
}
