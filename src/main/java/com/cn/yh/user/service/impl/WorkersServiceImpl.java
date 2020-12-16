package com.cn.yh.user.service.impl;

import com.cn.yh.user.entity.Masterinfo;
import com.cn.yh.user.entity.Schedule;
import com.cn.yh.user.entity.User;
import com.cn.yh.user.entity.Workers;

import com.cn.yh.user.mapper.WorkersMapper;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cn.yh.user.service.WorkersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Mr.Wang
 */
@Service
public class WorkersServiceImpl extends ServiceImpl<WorkersMapper, Workers> implements WorkersService {


    @Autowired
    WorkersMapper workersMapper;


    @Override
    public void addMaster(Masterinfo masterinfo) {
        workersMapper.addMaster(masterinfo);
    }

    @Override
    public void updateMaster(Masterinfo masterinfo) {
        workersMapper.updateMaster(masterinfo);
    }

    @Override
    public void deleteMaster(int id) {
        workersMapper.deleteMaster(id);
    }

    @Override
    public List<Masterinfo> findMaster() {
        return workersMapper.findMaster();
    }

    @Override
    public void addWorkers(Workers workers) {
        workersMapper.addWorkers(workers);
    }

    @Override
    public void deleteWorkers(int id) {
        workersMapper.deleteWorkers(id);
    }

    @Override
    public void updateWorkers(Workers workers) {
        workersMapper.updateWorkers(workers);
    }

    @Override
    public List<Workers> findWorkers() {
        return workersMapper.findWorkers();
    }

    @Override
    public List<String> findforeman() {
        return workersMapper.findforeman();
    }

    @Override
    public List<Workers> findByWorkers(String foreman) {
        return workersMapper.findByWorkers(foreman);
    }

    @Override
    public List<Masterinfo> findByMaster(String foreman) {
        return workersMapper.findByMaster(foreman);
    }
}
