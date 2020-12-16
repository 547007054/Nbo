package com.cn.yh.user.controller;


import com.cn.yh.user.entity.Student;
import com.cn.yh.user.entity.WorkPointManage;
import com.cn.yh.user.service.impl.MonitorServiceImpl;
import com.cn.yh.user.service.impl.WorkPointServiceImpl;
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
@RequestMapping("/Point")
public class WorkPointController {

    @Autowired
    WorkPointServiceImpl workPointServiceImpl;

    /**
     * 添加工点
     *
     * @return
     */
    @RequestMapping("/addWorkPoint")
    public Map<String, Object> addWorkPoint(WorkPointManage workPointManage) {
        Map<String, Object> map = new HashMap<>();
        if(workPointServiceImpl.findPoint(workPointManage.getWorkPoint())==0) {
            workPointServiceImpl.addWorkPoint(workPointManage);
            map.put("data", "成功");
        }else {
            map.put("data", "失败");
        }
        return map;
    }
    /**
     * 删除工点
     *
     * @return
     */
    @RequestMapping("/deletePoint")
    public Map<String, Object> deletePoint(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        String id = request.getParameter("id");
        workPointServiceImpl.deletePoint(Integer.valueOf(id));
        map.put("data", "成功");

        return map;
    }
    /**
     * 查询所有工点
     *
     * @return
     */
    @RequestMapping("/findWorkPointManage")
    public Map<String, Object> findWorkPointManage() {
        Map<String, Object> map = new HashMap<>();
        List<WorkPointManage> list = workPointServiceImpl.findWorkPointManage();
        map.put("data", list);
        return map;
    }

    /**
     * 获取当前工点所有的viewtoken
     */
    @RequestMapping("/queryName")
    public Map<String, Object> queryName(HttpServletRequest req) {
        String workPoint = req.getParameter("workPoint");
        Map<String, Object> map = new HashMap<>();
        WorkPointManage monMain = workPointServiceImpl.queryName(workPoint);
        String modelId = workPointServiceImpl.findView(monMain.getModelNameN());// 当前工区主体的viewtoken
        String drawId = workPointServiceImpl.findView(monMain.getDrawingN());// 当前工区围护桩的viewtoken
        map.put("data", modelId);// 模型的viewtoken
        map.put("data1", drawId);//图纸
        return map;
    }

}
