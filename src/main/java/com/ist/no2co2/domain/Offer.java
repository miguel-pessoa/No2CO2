package com.ist.no2co2.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Offer.
 */
@Entity
@Table(name = "offer")
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "point_cost")
    private Long pointCost;

    @Column(name = "name")
    private String name;

    @Column(name = "items_available")
    private Long itemsAvailable;

    @OneToOne
    @JoinColumn(unique = true)
    private Partner partner;

    @ManyToMany
    @JoinTable(name = "offer_employee",
               joinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"))
    private Set<Employee> employees = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPointCost() {
        return pointCost;
    }

    public Offer pointCost(Long pointCost) {
        this.pointCost = pointCost;
        return this;
    }

    public void setPointCost(Long pointCost) {
        this.pointCost = pointCost;
    }

    public String getName() {
        return name;
    }

    public Offer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getItemsAvailable() {
        return itemsAvailable;
    }

    public Offer itemsAvailable(Long itemsAvailable) {
        this.itemsAvailable = itemsAvailable;
        return this;
    }

    public void setItemsAvailable(Long itemsAvailable) {
        this.itemsAvailable = itemsAvailable;
    }

    public Partner getPartner() {
        return partner;
    }

    public Offer partner(Partner partner) {
        this.partner = partner;
        return this;
    }

    public void setPartner(Partner partner) {
        this.partner = partner;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public Offer employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public Offer addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.getOffers().add(this);
        return this;
    }

    public Offer removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.getOffers().remove(this);
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
        if (!(o instanceof Offer)) {
            return false;
        }
        return id != null && id.equals(((Offer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Offer{" +
            "id=" + getId() +
            ", pointCost=" + getPointCost() +
            ", name='" + getName() + "'" +
            ", itemsAvailable=" + getItemsAvailable() +
            "}";
    }
}
