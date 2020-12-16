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
@TableName("Participating")
public class Participating implements Serializable {

    private int id;
    private String name;//单位名称
    private String units;//参建单位


}
