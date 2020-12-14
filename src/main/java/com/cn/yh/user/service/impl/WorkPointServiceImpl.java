package com.cn.yh.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cn.yh.user.entity.Construction;
import com.cn.yh.user.entity.Student;
import com.cn.yh.user.entity.WorkPointManage;
import com.cn.yh.user.mapper.QualityMapper;
import com.cn.yh.user.mapper.WorkPointMapper;
import com.cn.yh.user.service.WorkPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

@Service
public class WorkPointServiceImpl extends ServiceImpl<WorkPointMapper, WorkPointManage> implements WorkPointService {

    @Autowired
    WorkPointMapper workPointMapper;

    public WorkPointManage queryName(String workPoint){
        return workPointMapper.queryName(workPoint);
    }

    @Override
    public int findPoint(String workPoint) {
        return workPointMapper.findPoint(workPoint);
    }

    @Override
    public void addWorkPoint(WorkPointManage workPointManage) {
        workPointMapper.addWorkPoint(workPointManage);
    }

    @Override
    public List<WorkPointManage> findWorkPointManage() {
        return workPointMapper.findWorkPointManage();
    }

    @Override
    public List<String> findWork() {
        return workPointMapper.findWork();
    }

    @Override
    public String findByWorkPoint(String workPoint) {
        return workPointMapper.findByWorkPoint(workPoint);
    }

    @Override
    public void deletePoint(int id) {
        workPointMapper.deletePoint(id);
    }

    // POST,获取AccessToken
    public String getAccessToken() {
        OutputStreamWriter out = null ;
        BufferedReader in = null;
        StringBuilder result = new StringBuilder();
        String url = "https://api.bimface.com/oauth2/token";
        // String sign = "11f5c83b448383cdb34330d5ddc88209";
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();
            //设置通用的请求头属性
            conn.setRequestProperty("Authorization", "Basic THJsZndNaktaMWI1b2RLaVU0d0NaTXVWMnRueWlZV1Q6T3I1WVg0Q3lkZ3FWRUliOVd5dFFnc3hZRHRjNmU2QkQ=");
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 发送POST请求必须设置如下两行   否则会抛异常（java.net.ProtocolException: cannot write to a URLConnection if doOutput=false - call setDoOutput(true)）
            conn.setDoOutput(true);
            conn.setDoInput(true);
            //获取URLConnection对象对应的输出流并开始发送参数
            out = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
            //添加参数
            //out.write("&songid="+"10800537");
            out.flush();
            in = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
            String line;
            while ((line = in.readLine()) != null) {
                result.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally {// 使用finally块来关闭输出流、输入流
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        String asString = result.toString();
        String []arr = asString.split("\"");
        System.out.println(arr[15]);
        return arr[15];
    }

    //传入fileId 获取viewtoken
    public String findView(String fileId) {
        WorkPointServiceImpl scheduleBiz = new WorkPointServiceImpl();
        String accessToken = scheduleBiz.getAccessToken();
        String result = "";
        BufferedReader in = null;
        try {
            String urlNameString = "https://api.bimface.com/view/token" + "?" + "fileId=" + fileId;
            System.out.println(urlNameString);
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);
            // 建立实际的连接
            connection.connect();
            // 获取所有响应头字段
            Map<String, List<String>> map = connection.getHeaderFields();
            // 遍历所有的响应头字段
            for (String key : map.keySet()) {
                System.out.println(key + "--->" + map.get(key));
            }
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("发送GET请求出现异常！" + e);
            e.printStackTrace();
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }

}
