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
@TableName("WorkPointManage")
public class WorkPointManage implements Serializable {

    private int id;
    private String workPoint;//项目名
    private String modelNameN;//模型编号
    private String drawingN;//图纸编号


}
