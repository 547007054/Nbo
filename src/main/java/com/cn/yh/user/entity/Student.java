package com.cn.yh.user.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 
 *
 * @author Mr.Wang
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("Student")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;
    private int id;
    private String name;


}
