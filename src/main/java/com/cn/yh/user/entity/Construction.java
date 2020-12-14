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
@TableName("Construction")
public class Construction implements Serializable {

    private int id;
    private String date;//日期
    private String week;//星期
    private String weatherD;//天气状况白天
    private String windD;//风力白天
    private String temperatureD;//温度白天
    private String remarkD;//备注白天
    private String weatherN;//天气状况夜间
    private String windN;//风力夜间
    private String temperatureN;//温度夜间
    private String remarkN;//备注夜间
    private String productionRecord;//生产情况记录
    private String workRecord;//技术质量安全工作记录
    private String inRecord;//材料、构配件进场记录
    private String principal;//工程负责人
    private String recorder;//记录人

}
