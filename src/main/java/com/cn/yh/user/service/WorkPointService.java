package com.cn.yh.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cn.yh.user.entity.Monitor;
import com.cn.yh.user.entity.Student;
import com.cn.yh.user.entity.WorkPointManage;

import java.util.List;

/**
 * @author Mr.Wang
 */
public interface WorkPointService extends IService<WorkPointManage> {

    public WorkPointManage queryName(String workPoint);

    //查询工点是否存在，存在不会重复添加
    public int findPoint(String workPoint);
    //添加工点
    public void addWorkPoint(WorkPointManage workPointManage);
    //查询当前项目的所有工点信息
    public List<WorkPointManage> findWorkPointManage();
    //查询都有哪些工点
    public List<String> findWork();
    //按照工点名称查询fileId
    public String findByWorkPoint(String workPoint);
    //删除工点
    public void deletePoint(int id);

}
