@echo off
SETLOCAL ENABLEDELAYEDEXPANSION
set WORKING_DIRECTORY=%cd%

call npm install
call bower install
call tsd reinstall -s