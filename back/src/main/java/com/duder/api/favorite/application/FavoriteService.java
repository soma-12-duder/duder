package com.duder.api.favorite.application;

import com.duder.api.favorite.domain.Favorite;
import com.duder.api.favorite.domain.FavoriteRepository;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import com.duder.api.post.response.PostListResponse;
import com.duder.api.post.service.PostService;
import com.duder.api.post.service.PostViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PostViewService postViewService;

    private static final String FAILED_NOT_FOUND_DATA = "해당 좋아요는 이미 삭제되었거나 중복되어 저장되어 있습니다.";
    private static final String FAILED_NOT_DUPLICATE_DATA = "해당 중복되어 저장되어 있습니다.";

    public List<PostListResponse> findFavoritePosts(Member member){
        List<Post> posts = favoriteRepository.findAllFavoritesByMemberId(member.getId())
                .stream()
                .map(o -> o.getPost())
                .collect(Collectors.toList());
        return postViewService.toPostListResponse(posts);
    }

    @Transactional
    public Long push(Member member, Long postId) throws IllegalArgumentException{
        if (findFavorite(member.getId(), postId)){
            throw new IllegalArgumentException(FAILED_NOT_DUPLICATE_DATA);
        }
        return favoriteRepository.save(new Favorite(member, new Post(postId))).getId();
    }

    @Transactional
    public Long delete(Member member, Long postId) throws IllegalArgumentException{
        Favorite favorite = favoriteRepository.findFavoriteByMemberIdAndPostId(member.getId(), postId)
                .orElseThrow(
                        () -> new IllegalArgumentException(FAILED_NOT_FOUND_DATA)
                );
        favoriteRepository.delete(favorite);
        return favorite.getId();
    }

    @Transactional
    public void deleteAllByPostId(Long postId) {
        List<Favorite> favorites = favoriteRepository.findAllByPostId(postId);
        favoriteRepository.deleteAll(favorites);
    }

    public boolean findFavorite(Long memberId, Long postId){
        return favoriteRepository.findFavoriteByMemberIdAndPostId(memberId, postId).isPresent();
    }
}
