package com.cn.yh.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cn.yh.user.entity.Construction;
import com.cn.yh.user.entity.Student;

import java.util.List;

/**
 * @author Mr.Wang
 */
public interface QualityService extends IService<Construction> {

    public List<Construction> findAll();
    public void added(Construction construction);
}
