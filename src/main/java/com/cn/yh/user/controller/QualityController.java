package com.cn.yh.user.controller;


import com.cn.yh.user.entity.Construction;
import com.cn.yh.user.entity.Student;
import com.cn.yh.user.service.impl.QualityServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Mr.Wang
 */
@RestController
@RequestMapping("/quality")
public class QualityController {
    @Autowired
    private RedisTemplate<String,Object> redisTemplate;
    @Autowired
    QualityServiceImpl qualityServiceImpl;

    @GetMapping("/findAll")
    public Map<String,Object> findAll(){
        Map<String,Object> map =new HashMap<>();
        List<Construction> list =qualityServiceImpl.findAll();
        map.put("data", list );

        return map;
    }
    @RequestMapping("/added")
    public Map<String,Object> added(Construction construction){
        Map<String,Object> map =new HashMap<>();
        qualityServiceImpl.added(construction);
        map.put("data",  "成功");
        return map;
    }

}
