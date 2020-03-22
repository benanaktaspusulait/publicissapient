package com.publicissapient.assigment.mapper;

import com.publicissapient.assigment.model.base.BaseEntity;
import com.publicissapient.assigment.model.dto.BaseDTO;
import org.mapstruct.MappingTarget;

import java.util.List;

/**
 * Contract for a generic dto to entity mapper.
 *
 * @param <D> - DTO type parameter.
 * @param <E> - Entity type parameter.
 */
public interface BaseEntityMapper<D extends BaseDTO, E extends BaseEntity> {

    E toEntity(D dto);

    E toEntity(D dto, @MappingTarget E entity);

    D toDto(E entity);

    List<E> toEntity(List<D> dtoList);

    List<D> toDto(List<E> entityList);

}
