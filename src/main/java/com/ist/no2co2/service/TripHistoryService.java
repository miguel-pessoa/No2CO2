package com.ist.no2co2.service;

import com.ist.no2co2.domain.TripHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link TripHistory}.
 */
public interface TripHistoryService {

    /**
     * Save a tripHistory.
     *
     * @param tripHistory the entity to save.
     * @return the persisted entity.
     */
    TripHistory save(TripHistory tripHistory);

    /**
     * Get all the tripHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TripHistory> findAll(Pageable pageable);


    /**
     * Get the "id" tripHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TripHistory> findOne(Long id);

    /**
     * Delete the "id" tripHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
