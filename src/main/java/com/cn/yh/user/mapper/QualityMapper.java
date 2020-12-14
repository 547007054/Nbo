package com.cn.yh.user.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cn.yh.user.entity.Construction;
import com.cn.yh.user.entity.Student;
import com.cn.yh.user.entity.Workers;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * @author Mr.Wang
 */
@Component
public interface QualityMapper extends BaseMapper<Construction> {
      public List<Construction> findAll();
      public void added(Construction construction);

}
