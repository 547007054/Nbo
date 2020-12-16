package com.cn.yh.user.service;

import com.cn.yh.user.entity.Masterinfo;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cn.yh.user.entity.Workers;

import java.util.List;

/**
 * @author Mr.Wang
 */
public interface WorkersService extends IService<Workers> {


    // 工长信息
    // 添加基本信息
    public void addMaster(Masterinfo masterinfo);
    public void updateMaster(Masterinfo masterinfo);
    // 删除工长
    public void deleteMaster(int id);
    // 查询基本信息
    public List<Masterinfo> findMaster();

    // 劳务人员信息
    // 添加基本信息
    public void addWorkers(Workers workers);

    public void deleteWorkers(int id);
    public void updateWorkers(Workers workers);
    // 查询基本信息
    public List<Workers> findWorkers();

    // 查询每个工长
    public List<String> findforeman();

    // 根据工长 查询基本信息
    public List<Workers> findByWorkers(String foreman);

    // 根据工长 查询基本信息
    public List<Masterinfo> findByMaster(String foreman);

}
