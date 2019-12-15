package com.ist.no2co2.service.impl;

import com.ist.no2co2.service.TripHistoryService;
import com.ist.no2co2.domain.TripHistory;
import com.ist.no2co2.repository.TripHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TripHistory}.
 */
@Service
@Transactional
public class TripHistoryServiceImpl implements TripHistoryService {

    private final Logger log = LoggerFactory.getLogger(TripHistoryServiceImpl.class);

    private final TripHistoryRepository tripHistoryRepository;

    public TripHistoryServiceImpl(TripHistoryRepository tripHistoryRepository) {
        this.tripHistoryRepository = tripHistoryRepository;
    }

    /**
     * Save a tripHistory.
     *
     * @param tripHistory the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TripHistory save(TripHistory tripHistory) {
        log.debug("Request to save TripHistory : {}", tripHistory);
        return tripHistoryRepository.save(tripHistory);
    }

    /**
     * Get all the tripHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TripHistory> findAll(Pageable pageable) {
        log.debug("Request to get all TripHistories");
        return tripHistoryRepository.findAll(pageable);
    }


    /**
     * Get one tripHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TripHistory> findOne(Long id) {
        log.debug("Request to get TripHistory : {}", id);
        return tripHistoryRepository.findById(id);
    }

    /**
     * Delete the tripHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TripHistory : {}", id);
        tripHistoryRepository.deleteById(id);
    }
}
