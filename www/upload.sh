#!/bin/sh 

ruby gen_command.rb

ftp -n < ./ftp.command