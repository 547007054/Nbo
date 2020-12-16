package com.cn.yh;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {
//	@Autowired
//	private RedisTemplate<String,String> redisTemplate;
//	@Autowired
//	private StudentServiceImpl studentService;

	@Test
	public void test() {
		System.out.println("李云龙");
	}

}
