package com.cn.yh.user.entity;

public class Schedule {
	private int id;
	private String workArea;//主体结构     围护结构
	private String sid;// 模型id
	private String over1;//计划结束
	private String over2;//实际结束
	private String code;
	private String name;
	private String rate;//产值
	private String structor;//施工人
	private String version;//版号
	private String concrete;//混凝土型号
	private String design;//设计方量
	private String actual;//实际方量
	public String getName() {
		return name;
	}

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public String getStructor() {
		return structor;
	}

	public void setStructor(String structor) {
		this.structor = structor;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Schedule() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getWorkArea() {
		return workArea;
	}

	public void setWorkArea(String workArea) {
		this.workArea = workArea;
	}

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public String getOver1() {
		return over1;
	}

	public void setOver1(String over1) {
		this.over1 = over1;
	}

	public String getOver2() {
		return over2;
	}

	public void setOver2(String over2) {
		this.over2 = over2;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getConcrete() {
		return concrete;
	}

	public void setConcrete(String concrete) {
		this.concrete = concrete;
	}

	public String getDesign() {
		return design;
	}

	public void setDesign(String design) {
		this.design = design;
	}

	public String getActual() {
		return actual;
	}

	public void setActual(String actual) {
		this.actual = actual;
	}




}
