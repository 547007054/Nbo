package com.cn.yh.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cn.yh.user.entity.Construction;
import com.cn.yh.user.entity.Student;
import com.cn.yh.user.mapper.MonitorMapper;
import com.cn.yh.user.mapper.QualityMapper;

import com.cn.yh.user.service.QualityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Mr.Wang
 */
@Service
public class QualityServiceImpl extends ServiceImpl<QualityMapper, Construction> implements QualityService {

    @Autowired
    QualityMapper qualityMapper;

//    @Cacheable(cacheNames = "stu",key="#a0")
//    public List<Student> findAll(int id){
//        return mapper.findAll(id);
//    }
//    @CachePut(value = "stu",key="#student.id")
//    public List<Student> update(Student student){
//        mapper.updateOne(student);
//     return   mapper.findAll(1);
//}

    @Override
    public List<Construction> findAll() {
        return qualityMapper.findAll();
    }

    @Override
    public void added(Construction construction) {
        qualityMapper.added(construction);
    }
}
