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
@TableName("Masterinfo")
public class Masterinfo implements Serializable {

    private int id;
    private String foreman;//工长
    private String company;//公司
    private String phone;//联系电话
    private String address;//居住地址
    private String territory;//负责区域
    private String team;//施工协作队伍
    private String number;//现有施工人数
    private String foreignd;//外来务工人员
    private String picture;//工长图片


}
