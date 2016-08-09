#-*- coding:utf-8 -*-

'''
Created on 2016年6月22日

@author: wenbin
'''
from utils import BaseHandler
from router import Route
from IPy import IP
from tornado.httpclient import AsyncHTTPClient
import tornado
import json

@Route('/validate/arp/ip')
class valid_arp_ip(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        '''validate arp '''
        ip = self.get_argument('ip',default='')
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/arps',headers=self.api_headers)
        arp_datas = json.loads(reps.body)
        arps = arp_datas['arps']
        test_pass = "true"
        for arp in arps:
            if ip == arp['ip']:
                test_pass = "false"
        self.finish(test_pass)


@Route('/validate/vlanname')
class valid_vlan_name(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        '''validate vlan of id'''
        name = self.get_argument('name',default='')
        exclude_name = self.get_argument('exclude', default='')
        if name==exclude_name:
            self.finish("true")
            return
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlans',headers=self.api_headers)
        vlan_datas = json.loads(reps.body)
        test_pass = "true"
        for vlan in vlan_datas['vlans']:
            if vlan['name'] == name:
                test_pass = "false"
        self.finish(test_pass)
        
@Route('/validate/vlanid')
class valid_vlan_id(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        '''validate vlan of id'''
        vlanid = self.get_argument('vlanid',default='')
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlans',headers=self.api_headers)
        vlan_datas = json.loads(reps.body)
        test_pass = "true"
        for vlan in vlan_datas['vlans']:
            if vlan['vlanid'] == vlanid:
                test_pass = "false"
        self.finish(test_pass)


@Route('/validate/vlanip')
class valid_vlan_ip(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def post(self):
        '''validate vlan of ip'''
        
        from IPy import IP
        valid_obj =  json.loads(self.request.body)
        wait_valid_ip_obj = valid_obj['cip']
        other_ipaddrs = valid_obj['other']
        exclude_vlan_name = valid_obj['exclude_vlan']
        result = {
            'status':'success',
            'reason':''    
            }
        wait_validate_ip = []
        ip = wait_valid_ip_obj['ip']
        netmask = wait_valid_ip_obj['netmask']
        ##检查网络地址和广播域是否被设置为vlan ip
        ip_obj = None
        try:
            ip_obj = IP(ip).make_net(netmask)
            net_addr = ip_obj.net()
            broadcast_addr = ip_obj.broadcast()
            if ip == str(net_addr) or ip == str(broadcast_addr):
                error_message = u"vlan ip(%s) 地址不能为网络地址或广播地址"%str(ip)
                result['status'] = 'failure'
                result['reason'] = error_message
                self.finish(json.dumps(result))
                return
        except :
            print("bad command,ip error.")
            error_message = "ip:%s/%s 格式错误"%(ip,netmask)
            result['status'] = 'failure'
            result['reason'] = error_message
            self.finish(json.dumps(result))
            return
                 
            
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlans',headers=self.api_headers)
        vlandatas = json.loads(reps.body)
        exist_vlan_ip = []
        for vlan in vlandatas['vlans']:
            if exclude_vlan_name == vlan['name']:
                continue
            vlan_ips = vlan['ipaddrs']
            for vlan_ip in vlan_ips:
                exist_vlan_ip.append(vlan_ip)
        
        ##与页面其他vlan ip做比较检查是否存在重叠域
        for tipobj in other_ipaddrs:
            tip = IP(tipobj['ip']).make_net(tipobj['netmask'])
            if wait_valid_ip_obj['ip_type'] <> tipobj['ip_type']:
                continue
            if ip_obj.overlaps(tip.__str__()):
                print("the ipaddres has overlaps.")
                error_message = u"ip:%s/%s 与其他VLAN IP(%s)存在重叠域"%(wait_valid_ip_obj['ip'],wait_valid_ip_obj['netmask'],tip)
                result['status'] = 'failure'
                result['reason'] = error_message
                self.finish(json.dumps(result))
        ##与后端已有vlan ip做比较 检查是否存在重叠域
        for tipobj in exist_vlan_ip:
            if wait_valid_ip_obj['ip_type'] <> tipobj['ip_type']:
                continue
            tip = IP(tipobj['ip']).make_net(tipobj['netmask'])
            if ip_obj.overlaps(tip.__str__()):
                print("the ipaddres has overlaps.")
                error_message = u"ip:%s/%s 与其他VLAN IP(%s)存在重叠域"%(wait_valid_ip_obj['ip'],wait_valid_ip_obj['netmask'],tip)
                result['status'] = 'failure'
                result['reason'] = error_message
                self.finish(json.dumps(result))
                return
                
            
        self.finish(json.dumps(result))
