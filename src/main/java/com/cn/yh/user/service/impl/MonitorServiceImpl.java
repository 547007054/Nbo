package com.cn.yh.user.service.impl;

import com.cn.yh.user.entity.Monitor;
import com.cn.yh.user.entity.Student;
import com.cn.yh.user.mapper.MonitorMapper;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cn.yh.user.service.MonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Mr.Wang
 */
@Service
public class MonitorServiceImpl extends ServiceImpl<MonitorMapper, Monitor> implements MonitorService {

    @Autowired
    MonitorMapper monitorMapper;


    @Override
    public void addMonitor(Monitor monitor) {
        monitorMapper.addMonitor(monitor);
    }

    @Override
    public List<Monitor> findMonitor(){
        return monitorMapper.findMonitor();

    }

    @Override
    public List<String> findArea(){
        return monitorMapper.findArea();
    }

    @Override
    public List<Monitor> findByArea(String area){
        return monitorMapper.findByArea(area);
    }

    @Override
    public List<Monitor> findByLocation(String area, String location){
        return monitorMapper.findByLocation(area,location);
    }
    @Override
    public List<String> findLocation(String area){
        return monitorMapper.findLocation(area);
    }
    @Override
    public void updateMonitor(Monitor monitor) {
        monitorMapper.updateMonitor(monitor);
    }
    @Override
    public void deleteMonitor(int id) {
        monitorMapper.deleteMonitor(id);
    }

}
