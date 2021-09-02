package com.duder.api.post.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @NoArgsConstructor
@Embeddable
public class Photo {

    @ElementCollection
    @CollectionTable(name = "photo",
            joinColumns = @JoinColumn(name = "post_id"))
    List<String> photoUrl = new ArrayList<>();

    public Photo(List<String> photoUrls) {
        this.photoUrl = photoUrls;
    }

}