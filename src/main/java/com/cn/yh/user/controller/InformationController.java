package com.cn.yh.user.controller;


import com.cn.yh.user.entity.Information;
import com.cn.yh.user.entity.Participating;
import com.cn.yh.user.entity.Student;
import com.cn.yh.user.entity.Video;
import com.cn.yh.user.service.impl.InformationServiceImpl;
import com.cn.yh.user.service.impl.QualityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Mr.Wang
 */
@RestController
@RequestMapping("/Information")
public class InformationController {

    @Autowired
    InformationServiceImpl informationServiceImpl;

    /**
     * 添加视频
     *123
     * @return
     */
    @RequestMapping("/addVideo")
    public Map<String, Object> addVideo(Video news) {
        Map<String, Object> map = new HashMap<>();

        informationServiceImpl.addVideo(news);

        map.put("data", "成功");

        return map;
    }

    /**
     * 查询所有视频信息
     *
     * @return
     */
    @RequestMapping("/findVideo")
    public Map<String, Object> findVideo() {
        Map<String, Object> map = new HashMap<>();

        List<Video> list = informationServiceImpl.findVideo();

        map.put("data", list);

        return map;
    }

    /**
     * 查询最新一条视频信息
     *
     * @return
     */
    @RequestMapping("/findTop")
    public Map<String, Object> findTop() {
        Map<String, Object> map = new HashMap<>();

        Video news = informationServiceImpl.findTop();

        map.put("data", news);

        return map;
    }

    /**
     * 查询所有参与单位
     *
     * @return
     */
    @RequestMapping("/findParticipating")
    public Map<String, Object> findParticipating() {
        Map<String, Object> map = new HashMap<>();
        List<Participating> list = informationServiceImpl.findParticipating();
        map.put("data", list);
        return map;
    }

    /**
     * 添加参与单位
     *
     * @return
     */
    @RequestMapping("/addParticipating")
    public Map<String, Object> addParticipating(Participating participating) {
        Map<String, Object> map = new HashMap<>();
        if (informationServiceImpl.findnumber(participating.getName(), participating.getUnits()) == 0) {
            informationServiceImpl.addParticipating(participating);
            map.put("data", "成功");
        } else {
            map.put("data", "失败");
        }
        return map;
    }

    /**
     * 删除参与单位
     *
     * @return
     */
    @RequestMapping("/deleteParticipating")
    public Map<String, Object> deleteParticipating(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        String id = request.getParameter("id");
        informationServiceImpl.deleteParticipating(Integer.valueOf(id));
        map.put("data", "成功");
        return map;
    }

    /**
     * 删除新闻视频
     *
     * @return
     */
    @RequestMapping("/deleteVideo")
    public Map<String, Object> deleteVideo(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        String id = request.getParameter("id");
        informationServiceImpl.deleteVideo(Integer.valueOf(id));
        map.put("data", "成功");
        return map;
    }

    /**
     * 查询所有基本信息
     *
     * @return
     */
    @RequestMapping("/findInformation")
    public Map<String, Object> findInformation() {
        Map<String, Object> map = new HashMap<>();
        List<Information> list = informationServiceImpl.findInformation();
        map.put("data", list);
        return map;
    }

    /**
     * 添加基本信息
     *
     * @return
     */
    @PostMapping("/addInformation")
    public Map<String, Object> addInformation(@RequestBody Information information) {
        Map<String, Object> map = new HashMap<>();
        if (informationServiceImpl.findNum() == 0) {
            informationServiceImpl.addInformation(information);
        } else {
            informationServiceImpl.updateInformation(information);
        }
        map.put("data", "成功");
        return map;
    }
    /**
     * 上传图片文件---质量巡检
     */
    @PostMapping("/uploadInformation")
    public Map<String, Object> uploadDrawing(@RequestParam MultipartFile file, HttpServletRequest request) {
//        String path = "E:\\apache-tomcat-8.5.37\\webapps\\YrGy\\models\\";
		String path = "D:\\workspace\\javakc74\\demo\\src\\main\\resources\\static\\models\\";
        String fileName = file.getOriginalFilename();
        try {
            InputStream in = file.getInputStream();
            byte[] buffer = new byte[1024];
            int len = 0;
            File files = new File(path);
            File fileParent = files.getParentFile();
            if (!fileParent.exists()) {
                fileParent.mkdirs();
            }
            OutputStream out = new FileOutputStream(path + fileName);
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
            out.close();
            in.close();
        } catch (Exception e) {
            System.out.println("----------" + path + "文件上传失败————————");
            e.printStackTrace();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("data", fileName);
        return map;
    }

}
