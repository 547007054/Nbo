package com.cn.yh.user.controller;


import com.cn.yh.user.entity.Masterinfo;
import com.cn.yh.user.entity.Schedule;
import com.cn.yh.user.entity.Workers;
import com.cn.yh.user.service.impl.WorkersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author Mr.Wang
 */
@RestController
@RequestMapping("/Workers")
public class WorkersController {

    @Autowired
    WorkersServiceImpl workersServiceImpl;

    /**
     * 查询所有基本信息
     * 工长信息
     * @return
     */
    @RequestMapping("/findMaster")
    public Map<String, Object> findMaster() {
        Map<String, Object> map = new HashMap<>();
        List<Masterinfo> list = workersServiceImpl.findMaster();
        map.put("data", list);
        return map;
    }

    /**
     * 添加工长基本信息
     *
     * @return
     */
    @RequestMapping("/addMaster")
    public Map<String, Object> addMaster( Masterinfo masterinfo) {
        Map<String, Object> map = new HashMap<>();
        workersServiceImpl.addMaster(masterinfo);
        map.put("data", "成功");
        return map;
    }
    /**
     * 修改工长基本信息
     *
     * @return
     */
    @RequestMapping("/updateMaster")
    public Map<String, Object> updateMaster(Masterinfo masterinfo) {

        Map<String, Object> map = new HashMap<>();
        workersServiceImpl.updateMaster(masterinfo);
        map.put("data", "成功");
        return map;
    }
    /**
     * 删除工长信息
     *
     * @return
     */
    @RequestMapping("/deleteMaster")
    public Map<String, Object> deleteMaster(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        String id = request.getParameter("id");
        workersServiceImpl.deleteMaster(Integer.valueOf(id));
        map.put("data", "成功");
        return map;
    }
    /**
     * 查询所有基本信息
     * 劳务人员信息
     * @return
     */
    @RequestMapping("/findWorkers")
    public Map<String, Object> findWorkers() {
        Map<String, Object> map = new HashMap<>();
        List<Workers> list = workersServiceImpl.findWorkers();
        map.put("data", list);
        return map;
    }
    /**
     * 添加劳务人员信息
     *
     * @return
     */
    @RequestMapping("/addWorkers")
    public Map<String, Object> addWorkers( Workers workers) {
        Map<String, Object> map = new HashMap<>();
        workersServiceImpl.addWorkers(workers);
        map.put("data", "成功");
        return map;
    }
    /**
     * 修改劳务人员信息
     *
     * @return
     */
    @RequestMapping("/updateWorkers")
    public Map<String, Object> updateWorkers(Workers workers) {

        Map<String, Object> map = new HashMap<>();
        workersServiceImpl.updateWorkers(workers);
        map.put("data", "成功");
        return map;
    }
    /**
     * 删除劳务人员信息
     *
     * @return
     */
    @RequestMapping("/deleteWorkers")
    public Map<String, Object> deleteWorkers(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        String id = request.getParameter("id");
        workersServiceImpl.deleteWorkers(Integer.valueOf(id));
        map.put("data", "成功");
        return map;
    }
    /**
     * 查询某工长下的劳务人员信息
     * @return
     */
    @RequestMapping("/findByWorkers")
    public Map<String, Object> findByWorkers(HttpServletRequest request) {
        String foreman = request.getParameter("foreman");
        Map<String, Object> map = new HashMap<>();
        List<Workers> list = workersServiceImpl.findByWorkers(foreman);//劳务人员信息
        List<Masterinfo> list1 = workersServiceImpl.findByMaster(foreman);//工长信息
        map.put("data", list);//劳务人员信息
        map.put("data1", list1);//工长信息
        return map;
    }


}
