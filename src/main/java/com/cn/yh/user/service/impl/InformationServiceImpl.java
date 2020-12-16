package com.cn.yh.user.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cn.yh.user.entity.*;
import com.cn.yh.user.mapper.InformationMapper;
import com.cn.yh.user.mapper.MonitorMapper;
import com.cn.yh.user.service.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
public class InformationServiceImpl extends ServiceImpl<InformationMapper, Information> implements InformationService {

    @Autowired
    InformationMapper informationMapper;

    @Override
    public int findNum() {
        return informationMapper.findNum();
    }

    @Override
    public void addInformation(Information information) {
        informationMapper.addInformation(information);
    }

    @Override
    public void updateInformation(Information information) {
        informationMapper.updateInformation(information);
    }

    @Override
    public List<Information> findInformation() {
        return informationMapper.findInformation();
    }

    @Override
    public int findnumber(String name, String units) {
        return informationMapper.findnumber(name,units);
    }

    @Override
    public void addParticipating(Participating participating) {
        informationMapper.addParticipating(participating);
    }

    @Override
    public List<Participating> findParticipating() {
        return informationMapper.findParticipating();
    }

    @Override
    public void deleteParticipating(int id) {
        informationMapper.deleteParticipating(id);
    }

    @Override
    public void addVideo(Video news) {
        informationMapper.addVideo(news);
    }

    @Override
    public void deleteVideo(int id) {
        informationMapper.deleteVideo(id);
    }

    @Override
    public List<Video> findVideo() {
        return informationMapper.findVideo();
    }

    @Override
    public Video findTop() {
        return informationMapper.findTop();
    }
}
