terraform {
  required_providers {
    twc = {
      source = "tf.timeweb.cloud/timeweb-cloud/timeweb-cloud"
    }
  }
  required_version = ">= 1.4.4"
}

provider "twc" {
  token = "..."
}

data "twc_configurator" "configurator" {
  location = "ru-1"
  preset_type = "premium"
}

data "twc_os" "os" {
  name = "ubuntu"
  version = "22.04"
}

data "twc_software" "software" {
  name = "Docker"
}

resource "twc_server" "devops" {
  name = "DevOps"
  os_id = data.twc_os.os.id
  software_id = data.twc_software.software.id

  configuration {
    configurator_id = data.twc_configurator.configurator.id
    disk = 30720
    cpu = 2
    ram = 4096
  }
}

resource "twc_server_ip" "server_ip" {
  source_server_id = twc_server.devops.id
  type = "ipv4"
}