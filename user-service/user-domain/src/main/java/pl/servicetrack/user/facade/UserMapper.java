package pl.servicetrack.user.facade;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import pl.servicetrack.user.db.model.UserEntity;
import pl.servicetrack.user.model.User;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    UserEntity userToUserEntity(User user);
    User userEntityToUser(UserEntity userEntity);
}
