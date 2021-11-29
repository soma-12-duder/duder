package com.duder.api.chat.presentation;

import com.duder.api.chat.application.ChatRequest;
import com.duder.api.chat.application.ChatResponse;
import com.duder.api.chat.application.ChatService;
import com.duder.api.form.ApiForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import static com.duder.api.form.ApiForm.fail;
import static com.duder.api.form.ApiForm.succeed;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChatService chatService;
    private final String SUCCESS_FIND_CHAT = "채팅 메시지를 성공적으로 조회했습니다.";
    private final String SUCCESS_SAVE_CHAT = "채팅 메시지를 성공적으로 저장했습니다.";
    private final String FAIL_SAVE_CHAT = "채팅 메시지 저장을 실패 했습니다.";
    private final String FAIL_FIND_CHAT = "채팅 메시지 조회를 실패 했습니다.";

    @MessageMapping("/message")
    @SendTo("/pop/message")
    public ApiForm<ChatResponse> save(ChatRequest request) {
        try {
            return succeed(chatService.save(request), SUCCESS_SAVE_CHAT);
        } catch (Exception e){
            return fail(FAIL_SAVE_CHAT);
        }
    }

    @ResponseBody
    @GetMapping("/chat/room/{roomId}/all")
    public ApiForm<List<ChatResponse>> findAllChat(@PathVariable Long roomId) {
        try {
            log.info("call all messages");
            return succeed(chatService.findAllChat(roomId), SUCCESS_FIND_CHAT);
        } catch (Exception e){
            return fail(FAIL_FIND_CHAT);
        }
    }

    @ResponseBody
    @GetMapping("/chat/room/{roomId}/last")
    public ApiForm<ChatResponse> findLastMessage(@PathVariable Long roomId){
        try {
            return succeed(chatService.findLastMessage(roomId), SUCCESS_FIND_CHAT);
        } catch (Exception e){
            return fail(e.getMessage());
        }
    }

}
