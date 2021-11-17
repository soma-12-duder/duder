package com.duder.api.chatroom.presentation;

import com.duder.api.chatroom.service.ChatroomRequest;
import com.duder.api.chatroom.service.ChatroomResponse;
import com.duder.api.chatroom.service.ChatroomService;
import com.duder.api.form.ApiForm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.duder.api.form.ApiForm.fail;
import static com.duder.api.form.ApiForm.succeed;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chatroom")
public class ChatroomController {

    private final ChatroomService chatroomService;
    private final String SUCCESS_FIND_CHATROOM = "채팅방 조회에 성공했습니다.";
    private final String SUCCESS_CREATE_CHATROOM = "채팅방 생성에 성공했습니다.";
    private final String SUCCESS_DELETE_CHATROOM = "채팅방 삭제에 성공했습니다.";

    @PostMapping
    public ApiForm<Long> createChatroom(@AuthenticationPrincipal OAuth2User oAuth2User,
                                        @RequestBody ChatroomRequest request){
        try {
            return succeed(chatroomService.createChatroom(oAuth2User.getAttribute("member")
                    , request.getOpponentId()), SUCCESS_CREATE_CHATROOM);
        } catch (Exception e){
            return fail(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ApiForm<List<ChatroomResponse>> findAllChatroom(@AuthenticationPrincipal OAuth2User oAuth2User){
        try {
            return succeed(chatroomService.findAllChatroom(oAuth2User.getAttribute("member")),
                    SUCCESS_FIND_CHATROOM);
        }catch (Exception e){
            return fail(e.getMessage());
        }
    }

    @DeleteMapping("/{roomId}")
    public ApiForm<Long> deleteRoom(@PathVariable Long roomId){
        try {
            return succeed(chatroomService.deleteById(roomId), SUCCESS_DELETE_CHATROOM);
        } catch (Exception e){
            return fail(e.getMessage());
        }
    }

}
