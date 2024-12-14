cmake_minimum_required(VERSION 3.5.0)
project(graphics_renderer VERSION 0.1.0 LANGUAGES C CXX)
cmake_policy(SET CMP0072 NEW)

find_package(OpenGL REQUIRED)

add_executable(graphics_renderer 
src/main.cpp
src/glad.h
src/glad.c
)

target_link_libraries(graphics_renderer 
glfw
OpenGL::GL
)

