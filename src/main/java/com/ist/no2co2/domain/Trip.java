package com.ist.no2co2.domain;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Trip.
 */
@Entity
@Table(name = "trip")
public class Trip implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "point_amout")
    private Long pointAmout;

    @OneToOne
    @JoinColumn(unique = true)
    private Location from;

    @OneToOne
    @JoinColumn(unique = true)
    private Location to;

    /**
     * A relationship
     */
    @ApiModelProperty(value = "A relationship")
    @OneToMany(mappedBy = "trip")
    private Set<Employee> employees = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPointAmout() {
        return pointAmout;
    }

    public Trip pointAmout(Long pointAmout) {
        this.pointAmout = pointAmout;
        return this;
    }

    public void setPointAmout(Long pointAmout) {
        this.pointAmout = pointAmout;
    }

    public Location getFrom() {
        return from;
    }

    public Trip from(Location location) {
        this.from = location;
        return this;
    }

    public void setFrom(Location location) {
        this.from = location;
    }

    public Location getTo() {
        return to;
    }

    public Trip to(Location location) {
        this.to = location;
        return this;
    }

    public void setTo(Location location) {
        this.to = location;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public Trip employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public Trip addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.setTrip(this);
        return this;
    }

    public Trip removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.setTrip(null);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Trip)) {
            return false;
        }
        return id != null && id.equals(((Trip) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Trip{" +
            "id=" + getId() +
            ", pointAmout=" + getPointAmout() +
            "}";
    }
}
