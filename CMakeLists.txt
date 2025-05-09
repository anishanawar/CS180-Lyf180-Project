cmake_minimum_required(VERSION 3.5)
project(LYF180Server)

set(CMAKE_CXX_STANDARD 17)
include_directories(${CMAKE_SOURCE_DIR}/crow/include)

find_package(Boost REQUIRED COMPONENTS system)
include_directories(${Boost_INCLUDE_DIRS})
add_compile_definitions(CROW_USE_BOOST_ASIO)

add_executable(server
  server.cpp
  randomQuote.cpp
)

target_link_libraries(server
  PRIVATE Boost::system
  pthread
)
