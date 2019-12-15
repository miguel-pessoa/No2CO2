package com.ist.no2co2.repository;
import com.ist.no2co2.domain.TripHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TripHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TripHistoryRepository extends JpaRepository<TripHistory, Long> {

}
