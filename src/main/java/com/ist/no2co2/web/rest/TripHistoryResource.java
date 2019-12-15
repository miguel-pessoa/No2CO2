package com.ist.no2co2.web.rest;

import com.ist.no2co2.domain.TripHistory;
import com.ist.no2co2.service.TripHistoryService;
import com.ist.no2co2.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ist.no2co2.domain.TripHistory}.
 */
@RestController
@RequestMapping("/api")
public class TripHistoryResource {

    private final Logger log = LoggerFactory.getLogger(TripHistoryResource.class);

    private static final String ENTITY_NAME = "tripHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TripHistoryService tripHistoryService;

    public TripHistoryResource(TripHistoryService tripHistoryService) {
        this.tripHistoryService = tripHistoryService;
    }

    /**
     * {@code POST  /trip-histories} : Create a new tripHistory.
     *
     * @param tripHistory the tripHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tripHistory, or with status {@code 400 (Bad Request)} if the tripHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/trip-histories")
    public ResponseEntity<TripHistory> createTripHistory(@RequestBody TripHistory tripHistory) throws URISyntaxException {
        log.debug("REST request to save TripHistory : {}", tripHistory);
        if (tripHistory.getId() != null) {
            throw new BadRequestAlertException("A new tripHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TripHistory result = tripHistoryService.save(tripHistory);
        return ResponseEntity.created(new URI("/api/trip-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /trip-histories} : Updates an existing tripHistory.
     *
     * @param tripHistory the tripHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tripHistory,
     * or with status {@code 400 (Bad Request)} if the tripHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tripHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/trip-histories")
    public ResponseEntity<TripHistory> updateTripHistory(@RequestBody TripHistory tripHistory) throws URISyntaxException {
        log.debug("REST request to update TripHistory : {}", tripHistory);
        if (tripHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TripHistory result = tripHistoryService.save(tripHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tripHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /trip-histories} : get all the tripHistories.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tripHistories in body.
     */
    @GetMapping("/trip-histories")
    public ResponseEntity<List<TripHistory>> getAllTripHistories(Pageable pageable) {
        log.debug("REST request to get a page of TripHistories");
        Page<TripHistory> page = tripHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /trip-histories/:id} : get the "id" tripHistory.
     *
     * @param id the id of the tripHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tripHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/trip-histories/{id}")
    public ResponseEntity<TripHistory> getTripHistory(@PathVariable Long id) {
        log.debug("REST request to get TripHistory : {}", id);
        Optional<TripHistory> tripHistory = tripHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tripHistory);
    }

    /**
     * {@code DELETE  /trip-histories/:id} : delete the "id" tripHistory.
     *
     * @param id the id of the tripHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/trip-histories/{id}")
    public ResponseEntity<Void> deleteTripHistory(@PathVariable Long id) {
        log.debug("REST request to delete TripHistory : {}", id);
        tripHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
