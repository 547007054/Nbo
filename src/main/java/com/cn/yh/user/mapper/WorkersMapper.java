package com.cn.yh.user.mapper;

import com.cn.yh.user.entity.Masterinfo;
import com.cn.yh.user.entity.Schedule;
import com.cn.yh.user.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cn.yh.user.entity.Workers;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * @author Mr.Wang
 */
@Component
public interface WorkersMapper extends BaseMapper<Workers> {


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
