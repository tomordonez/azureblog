---
title: 'Create a Windows 10 Virtual Machine in Azure'
date: '2023-02-17'
---

## Estimate Azure VM pricing

Open the Azure pricing calculator [here](https://azure.microsoft.com/en-us/pricing/calculator/)

Select `Virtual Machine` and scroll down to see the calculator.

If you are using the VM only for Power BI then a 4GB of RAM might be good enough. However, if you use it for Power BI and one more program like Visual Studio, the applications will crash with only 4GB, then use 8GB RAM.

On the calculator, leave the defaults:

* `Region`: Central US
* `OS`: Windows
* `Type`: OS Only
* `Tier`: Basic
* `Instance`: A2: 2 Cores, 3.5GB RAM, 60GB Temporary Storage, $0.085/hour
* `Virtual machine`: 1
* `Number of hours`:
  * Let's say that you work on PowerBI 4 hours per day, 5 days a week, 4 weeks. Total hours `80`
  * Monthly cost so far is `$9.20/month`
* `Compute (A2)`: Pay as you go
* `OS (Windows)`: License included

Changing the instance to A3 with 7GB gives `$17.44/month`

However, when creating a VM below, there aren't `A` instances. The lowest letter is `B`.
 
## Create a Virtual Machine in Azure

Go to your Azure dashboard. (Or open a free Azure account)

In the search, type `virtual machine` and select the service.

On the drop down, click `Create` and then `Azure virtual machine`

**Project details**

* Choose a resource group or create one.

**Instance details**

* Enter a name
* Select the `region` closest to you.
* `Availability options`: Leave default `No infrastructure redundancy required`
* `Security type`: Leave default `Standard`
* `Image`: Select `Windows 10 Pro, version 21H2 - x64 Gen2 (free services available)`
* `VM architecture`: By default it should be `x64`
* `Size`
  * The default is too expensive `Standard_D2s_v3 - 2vcpus, 8GiB memory ($96.36/month)`
  * Click `See all sizes`
    * Review the prices for `B-Series` (they are the cheapest)
      * `B2s` ($30.37/mo) has 2 vcpus, 4GB RAM, 8GB temp storage
      * `B2ms` ($60.74/mo) has 2 vcpus, 8GB RAM, 16GB temp storage
  * Select `B2s`

**4GB is too low**

A few weeks after I installed PowerBI on a VM with the `B2s` and installing Visual Studio. These two applications crash if you try to open them at the same time.

Either, only open one application at a time to save money. Or upgrade the instance to `B2ms`.

**Admin account**

* Create `username`
* Create `password`

**Inbound port rules**

* `Public inbound ports`: Allow selected ports
  * Select `RDP` and `HTTPS`
  * (This will allow all IP addresses to access your VM. This is only recommended for testing. Use the Advanced controls in the Networking tab to create rules to limit inbound traffic to known IP addresses)

**Licensing**

Check `I confirm I have an eligible Windows 10/11 license with multi-tenant hosting rights`

Click on `Next: Disks`

**Disks/OS Disk**

* `OS disk type`: Change to `Standard SSD`

Click on `Next: Networking`

**Networking**

Leave defaults.

Click on `Review + create`

**Review + create**

Review all details then click `Create`.

When ready click `go to resource`

## RDP on Linux

If you have a Linux machine, install an RDP program to connect to the Windows VM.

An option is `Remmina` as seen in the docs [here](https://remmina.org/how-to-install-remmina/).

Install using snap

    sudo snap install remmina

Output (Feb 2023):

    remmina v1.4.29 from Remmina Upstream Developers

Open the program

* Create an RDP connection
* Enter a name like `azure-pbi`
* Protocol select `RDP`
* Server: Enter the `IP address` of the VM (see below)
* Enter user and pwd
* Resolution: `Use client resolution`
* Click `Save and Connect`

## Connect to the VM

Go to the VM, then `Connect` drop down, select `RDP`.

If you are on Windows or OSX. Click on `Download RDP File` to connect to the VM.

If you are on Linux, the IP number of the VM is on this screen, then follow above steps.

If it asks to accept the certificate, select `Yes`.

The Windows VM should start loading as if you just bought a new Windows laptop.

Choose privacy settings for your device. Set everything to `No` and `Accept`. Networks popup select `No`

## Shut down the VM

When done working with the VM.

* Shut down the machine in Windows
  * Go to the bottom bar, shut down.
  * The RDP connection should close.
* Go to Azure
  * Find the VM and click `Stop`.
  * The status **MUST** appear as `Stopped (deallocated)` (it takes a few seconds)

As seen in [this](https://build5nines.com/properly-shutdown-azure-vm-to-save-money/) article, it is recommended to auto shutdown the VM in case you forget to do it.

* Go to Azure
* Find the VM
* Left menu Operations
* Enter a time to shutdown, then Save.