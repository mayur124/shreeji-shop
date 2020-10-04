package com.shreejiShop.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "MODEL")
public class Model {
	@Id
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME")
	private String name;

	@Column(name = "NETWORK_TECHNOLOGY")
	private String networkTechnology;

	@Column(name = "BANDS_2G")
	private String bands2g;

	@Column(name = "BANDS_3G")
	private String bands3g;

	@Column(name = "BANDS_4G")
	private String bands4g;

	@Column(name = "NETWORK_SPEED")
	private String networkSpeed;

	@Column(name = "GPRS")
	private String gprs;

	@Column(name = "EDGE")
	private String edge;

	@Column(name = "ANNOUNCED")
	private String announced;

	@Column(name = "STATUS")
	private String status;

	@Column(name = "DIMENSIONS")
	private String dimensions;

	@Column(name = "WEIGHT_G")
	private String weightG;

	@Column(name = "SIM")
	private String sim;

	@Column(name = "DISPLAY_TYPE")
	private String displayType;

	@Column(name = "DISPLAY_RESOLUTION")
	private String displayResolution;

	@Column(name = "DISPLAY_SIZE")
	private String displaySize;

	@Column(name = "OS")
	private String os;

	@Column(name = "CPU")
	private String cpu;

	@Column(name = "CHIPSET")
	private String chipset;

	@Column(name = "GPU")
	private String gpu;

	@Column(name = "MEMORY_CARD")
	private String memoryCard;

	@Column(name = "INTERNAL_MEMORY")
	private String internalMemory;

	@Column(name = "RAM")
	private String ram;

	@Column(name = "PRIMARY_CAMERA")
	private String primaryCamera;

	@Column(name = "SECONDARY_CAMERA")
	private String secondaryCamera;

	@Column(name = "LOUD_SPEAKER")
	private String speaker;

	@Column(name = "AUDIO_JACK")
	private String audioJack;

	@Column(name = "WLAN")
	private String wlan;

	@Column(name = "BLUETOOTH")
	private String bluetooth;

	@Column(name = "GPS")
	private String gps;

	@Column(name = "USB")
	private String usb;

	@Column(name = "SENSORS")
	private String sensors;

	@Column(name = "BATTERY")
	private String battery;

	@Column(name = "COLORS")
	private String colors;

	@Column(name = "APPROX_PRICE_EUR")
	private Long priceEur;

	@Column(name = "IMG_URL")
	private String imgUrl;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNetworkTechnology() {
		return networkTechnology;
	}

	public void setNetworkTechnology(String networkTechnology) {
		this.networkTechnology = networkTechnology;
	}

	public String getBands2g() {
		return bands2g;
	}

	public void setBands2g(String bands2g) {
		this.bands2g = bands2g;
	}

	public String getBands3g() {
		return bands3g;
	}

	public void setBands3g(String bands3g) {
		this.bands3g = bands3g;
	}

	public String getBands4g() {
		return bands4g;
	}

	public void setBands4g(String bands4g) {
		this.bands4g = bands4g;
	}

	public String getNetworkSpeed() {
		return networkSpeed;
	}

	public void setNetworkSpeed(String networkSpeed) {
		this.networkSpeed = networkSpeed;
	}

	public String getGprs() {
		return gprs;
	}

	public void setGprs(String gprs) {
		this.gprs = gprs;
	}

	public String getEdge() {
		return edge;
	}

	public void setEdge(String edge) {
		this.edge = edge;
	}

	public String getAnnounced() {
		return announced;
	}

	public void setAnnounced(String announced) {
		this.announced = announced;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDimensions() {
		return dimensions;
	}

	public void setDimensions(String dimensions) {
		this.dimensions = dimensions;
	}

	public String getWeightG() {
		return weightG;
	}

	public void setWeightG(String weightG) {
		this.weightG = weightG;
	}

	public String getSim() {
		return sim;
	}

	public void setSim(String sim) {
		this.sim = sim;
	}

	public String getDisplayType() {
		return displayType;
	}

	public void setDisplayType(String displayType) {
		this.displayType = displayType;
	}

	public String getDisplayResolution() {
		return displayResolution;
	}

	public void setDisplayResolution(String displayResolution) {
		this.displayResolution = displayResolution;
	}

	public String getDisplaySize() {
		return displaySize;
	}

	public void setDisplaySize(String displaySize) {
		this.displaySize = displaySize;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

	public String getCpu() {
		return cpu;
	}

	public void setCpu(String cpu) {
		this.cpu = cpu;
	}

	public String getChipset() {
		return chipset;
	}

	public void setChipset(String chipset) {
		this.chipset = chipset;
	}

	public String getGpu() {
		return gpu;
	}

	public void setGpu(String gpu) {
		this.gpu = gpu;
	}

	public String getMemoryCard() {
		return memoryCard;
	}

	public void setMemoryCard(String memoryCard) {
		this.memoryCard = memoryCard;
	}

	public String getInternalMemory() {
		return internalMemory;
	}

	public void setInternalMemory(String internalMemory) {
		this.internalMemory = internalMemory;
	}

	public String getRam() {
		return ram;
	}

	public void setRam(String ram) {
		this.ram = ram;
	}

	public String getPrimaryCamera() {
		return primaryCamera;
	}

	public void setPrimaryCamera(String primaryCamera) {
		this.primaryCamera = primaryCamera;
	}

	public String getSecondaryCamera() {
		return secondaryCamera;
	}

	public void setSecondaryCamera(String secondaryCamera) {
		this.secondaryCamera = secondaryCamera;
	}

	public String getSpeaker() {
		return speaker;
	}

	public void setSpeaker(String speaker) {
		this.speaker = speaker;
	}

	public String getAudioJack() {
		return audioJack;
	}

	public void setAudioJack(String audioJack) {
		this.audioJack = audioJack;
	}

	public String getWlan() {
		return wlan;
	}

	public void setWlan(String wlan) {
		this.wlan = wlan;
	}

	public String getBluetooth() {
		return bluetooth;
	}

	public void setBluetooth(String bluetooth) {
		this.bluetooth = bluetooth;
	}

	public String getGps() {
		return gps;
	}

	public void setGps(String gps) {
		this.gps = gps;
	}

	public String getUsb() {
		return usb;
	}

	public void setUsb(String usb) {
		this.usb = usb;
	}

	public String getSensors() {
		return sensors;
	}

	public void setSensors(String sensors) {
		this.sensors = sensors;
	}

	public String getBattery() {
		return battery;
	}

	public void setBattery(String battery) {
		this.battery = battery;
	}

	public String getColors() {
		return colors;
	}

	public void setColors(String colors) {
		this.colors = colors;
	}

	public Long getPriceEur() {
		return priceEur;
	}

	public void setPriceEur(Long priceEur) {
		this.priceEur = priceEur;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	@Override
	public String toString() {
		return "Models [id=" + id + ", name=" + name + ", networkTechnology=" + networkTechnology + ", bands2g="
				+ bands2g + ", bands3g=" + bands3g + ", bands4g=" + bands4g + ", networkSpeed=" + networkSpeed
				+ ", gprs=" + gprs + ", edge=" + edge + ", announced=" + announced + ", status=" + status
				+ ", dimensions=" + dimensions + ", weightG=" + weightG + ", sim=" + sim + ", displayType="
				+ displayType + ", displayResolution=" + displayResolution + ", displaySize=" + displaySize + ", os="
				+ os + ", cpu=" + cpu + ", chipset=" + chipset + ", gpu=" + gpu + ", memoryCard=" + memoryCard
				+ ", internalMemory=" + internalMemory + ", ram=" + ram + ", primaryCamera=" + primaryCamera
				+ ", secondaryCamera=" + secondaryCamera + ", speaker=" + speaker + ", audioJack=" + audioJack
				+ ", wlan=" + wlan + ", bluetooth=" + bluetooth + ", gps=" + gps + ", usb=" + usb + ", sensors="
				+ sensors + ", battery=" + battery + ", colors=" + colors + ", priceEur=" + priceEur + ", imgUrl="
				+ imgUrl + "]";
	}

}
