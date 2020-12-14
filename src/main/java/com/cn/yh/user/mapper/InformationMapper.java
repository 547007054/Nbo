package com.cn.yh.user.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cn.yh.user.entity.*;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * @author Mr.Wang
 */
@Component
public interface InformationMapper extends BaseMapper<Information> {

    // 按照项目简介查询是否存在，存在就更新，不存在添加
    public int findNum();

    // 添加基本信息
    public void addInformation(Information information);

    // 更新基本信息
    public void updateInformation(Information information);

    // 查询基本信息
    public List<Information> findInformation();

    /**
     * 参与单位
     *
     * @param name
     * @param units
     * @return
     */
    // 查询当前参与单位是否存在
    public int findnumber(String name, String units);

    // 添加参与单位
    public void addParticipating(Participating participating);

    // 查询所有参与单位
    public List<Participating> findParticipating();

    // 删除参建单位
    public void deleteParticipating(int id);

    /**
     * 新闻 pdf
     */
    // 添加视频
    public void addVideo(Video news);

    // 删除新闻
    public void deleteVideo(int id);

    // 查询所有视频
    public List<Video> findVideo();

    // 查询最新一条视频
    public Video findTop();
}
