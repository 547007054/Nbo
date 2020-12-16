package com.cn.yh.user.controller;

import com.cn.yh.user.unit.SendSms;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/Message")
public class MessageController {

    @RequestMapping("/sendMessage")
    public Map<String,Object> sendMessage() throws Exception {
        Map<String,Object> map =new HashMap<>();
        SendSms SendSms = new SendSms();
        SendSms.sendMessage("123");



        map.put("data", "成功" );

        return map;
    }

}
