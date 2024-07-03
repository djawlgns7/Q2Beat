package org.bit.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.bit.model.Q2Notice.Admin;

@Mapper
public interface AdminMapper {
    @Select("SELECT * FROM admin WHERE admin_username = #{admin_username}")
    Admin findByUsername(@Param("admin_username") String admin_username);

    @Insert("INSERT INTO admin(admin_id, admin_username, admin_password, admin_name)" +
            "VALUES(#{admin_id}, #{admin_username}, #{admin_password}, #{admin_name})")
    void insertAdmin(Admin admin);
}
