package com.cn.yh.user.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * 
 *
 * @author Mr.Wang
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("Information")
public class Information implements Serializable {

    private int id;
    private String introduction;//项目简介
    private String picture;//项目图片
    private String roam;//项目漫游视频



}
