package com.linkedin.metadata.config;

import lombok.Data;
/**
 * POJO representing the "ASD" configuration block in application.yml.
 */
@Data
public class ASDConfiguration {
  /**
   * AS&D url
   */
  public String url;
}