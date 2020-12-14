package com.cn.yh.user.service;

import com.cn.yh.user.entity.Monitor;
import com.cn.yh.user.entity.Student;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author Mr.Wang
 */
public interface MonitorService extends IService<Monitor> {
    // 添加基本信息
    public void addMonitor(Monitor monitor);
    public void updateMonitor(Monitor monitor);
    public void deleteMonitor(int id);

    // 查询基本信息
    public List<Monitor> findMonitor();

    // 查询
    public List<String> findArea();
    // 查询
    public List<String> findLocation(String area);

    // 根据地区 查询基本信息
    public List<Monitor> findByArea(String area);

    // 根据地区下的位置 查询基本信息
    public List<Monitor> findByLocation(String area, String location);
}
