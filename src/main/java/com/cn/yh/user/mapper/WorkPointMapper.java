package com.cn.yh.user.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cn.yh.user.entity.Monitor;
import com.cn.yh.user.entity.Student;
import com.cn.yh.user.entity.WorkPointManage;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * @author Mr.Wang
 */
@Component
public interface WorkPointMapper extends BaseMapper<WorkPointManage> {
      /**
       * 根据工区查询  模型1、2和图纸
       */
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
