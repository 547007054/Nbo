package com.cn.yh.user.controller;


import com.cn.yh.user.entity.Monitor;
import com.cn.yh.user.entity.Student;
import com.cn.yh.user.service.impl.MonitorServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Mr.Wang
 */
@RestController
@RequestMapping("/Monitor")
public class MonitorController {

    @Autowired
    MonitorServiceImpl monitorServiceImpl;

    /**
     * 添加
     *
     * @return
     */
    @RequestMapping("/addMonitor")
    public Map<String, Object> addMonitor(Monitor monitor) {
        Map<String, Object> map = new HashMap<>();
        monitorServiceImpl.addMonitor(monitor);
        map.put("data", "成功");
        return map;
    }
    /**
     * 删除
     *
     * @return
     */
    @RequestMapping("/deleteMonitor")
    public Map<String, Object> deleteMonitor(HttpServletRequest request ) {
        String id = request.getParameter("id");
        Map<String, Object> map = new HashMap<>();
        monitorServiceImpl.deleteMonitor(Integer.valueOf(id));
        map.put("data", "成功");
        return map;
    }
    /**
     * 修改
     *
     * @return
     */
    @RequestMapping("/updateMonitor")
    public Map<String, Object> updateMonitor(Monitor monitor) {
        Map<String, Object> map = new HashMap<>();
        monitorServiceImpl.updateMonitor(monitor);
        map.put("data", "成功");
        return map;
    }

    /**
     * 查询所有信息
     *
     * @return
     */
    @RequestMapping("/findMonitor")
    public Map<String, Object> findMonitor() {
        Map<String, Object> map = new HashMap<>();
        List<Monitor> list = monitorServiceImpl.findMonitor();
        map.put("data", list);
        return map;
    }

    /**
     * 查询每个地区的视频信息
     *
     * @return
     */
    @RequestMapping("/findArea")
    public Map<String, Object> findArea(HttpServletRequest request) {
        String aread = request.getParameter("area");
        Map<String, Object> map = new HashMap<>();

        List<String> list1 = monitorServiceImpl.findArea();
        List<String> list2 = monitorServiceImpl.findLocation(aread);
        map.put("data1", list1);//每个地区
        map.put("data2", list2);//每个地区下的某个位置

        return map;
    }


    /**
     * 查询每个地区下的
     * 特定位置的视频信息
     *
     * @return
     */
    @RequestMapping("/findByLocation")
    public Map<String, Object> findByLocation(HttpServletRequest request) {
        String area = request.getParameter("area");
        String location = request.getParameter("location");
        Map<String, Object> map = new HashMap<>();
        List<Monitor> list = monitorServiceImpl.findByLocation(area,location);
        map.put("data", list);//某个地区下某个位置的所有信息
        return map;
    }

}
