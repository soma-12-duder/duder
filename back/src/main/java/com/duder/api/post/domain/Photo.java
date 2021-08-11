package com.duder.api.post.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Embeddable
public class Photo {

    @ElementCollection
    @CollectionTable(name = "photo",
            joinColumns = @JoinColumn(name = "post_id"))
    List<String> photoUrl = new ArrayList<>();

}