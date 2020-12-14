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
@TableName("Workers")
public class Workers implements Serializable {

    private int id;
    private String name;//姓名
    private String type;//工种
    private String sex;//性别
    private String politics;//政治
    private String cardId;//身份证号
    private String site;//地址
    private String contact;//联系方式
    private String wage;//工资（元）
    private String state;//工资状态
    private String foreman;//工长


}
