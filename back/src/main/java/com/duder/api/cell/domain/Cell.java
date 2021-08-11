package com.duder.api.cell.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Cell {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cell_id")
    private Long id;

    private double longitude;
    private double latitude;

}