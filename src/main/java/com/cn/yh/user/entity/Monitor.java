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
@TableName("Monitor")
public class Monitor implements Serializable {

    private int id;
    private String number;//
    private String channel;//
    private String verification;//
    private String area;//施工区
    private String location;//位置


}
